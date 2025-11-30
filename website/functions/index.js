const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const postmark = require("postmark");

// Define the Postmark Server API Token as a secret
const postmarkApiKey = defineSecret("POSTMARK_API_KEY");

// Cloud Function that triggers when a document is created in the 'mail' collection
exports.sendEmail = onDocumentCreated(
  {
    document: "mail/{docId}",
    secrets: [postmarkApiKey],
    region: "us-east1", // Using us-east1 which works with nam5 multi-region Firestore
  },
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      console.log("No data associated with the event");
      return;
    }

    const mailData = snapshot.data();

    // Initialize Postmark client with the API key
    const client = new postmark.ServerClient(postmarkApiKey.value());

    // Build the email message for Postmark
    const emailMessage = {
      From: mailData.from || "info@pageant-wagon.com", // Must be a verified sender signature in Postmark
      To: mailData.to,
      Subject: mailData.message?.subject || mailData.subject || "No Subject",
      HtmlBody: mailData.message?.html || mailData.html || undefined,
      TextBody: mailData.message?.text || mailData.text || undefined,
      MessageStream: "outbound", // Use the default transactional stream
    };

    // Add reply-to if specified
    if (mailData.replyTo || mailData.message?.replyTo) {
      emailMessage.ReplyTo = mailData.replyTo || mailData.message?.replyTo;
    }

    try {
      const response = await client.sendEmail(emailMessage);
      console.log(`Email sent successfully to ${emailMessage.To}`, response);

      // Update the document with delivery status
      await snapshot.ref.update({
        delivery: {
          state: "SUCCESS",
          attempts: 1,
          endTime: new Date(),
          messageId: response.MessageID,
        },
      });
    } catch (error) {
      console.error("Error sending email:", error);

      // Update the document with error status
      await snapshot.ref.update({
        delivery: {
          state: "ERROR",
          attempts: 1,
          endTime: new Date(),
          error: error.message,
          errorCode: error.code,
        },
      });

      throw error;
    }
  }
);
