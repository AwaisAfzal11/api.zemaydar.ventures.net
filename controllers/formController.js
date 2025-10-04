const transporter = require('../config/mailer');
const multer = require('multer');

// Configure multer for in-memory storage (we don't save files to disk)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const handleDataForm = async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const adminMailOptions = {
        from: `"Zemaydar.net System" <${process.env.EMAIL_USER}>`,
        to: 'zemaydar.net@gmail.com',
        subject: 'New Client Inquiry',
        html: `
            <h3>New Inquiry from Zemaydar.net</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `,
    };

    const clientMailOptions = {
        from: `"Zemaydar.net" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome! We have received your inquiry.',
        html: `
            <h3>Hello ${name},</h3>
            <p>Thank you for contacting us. We have received your information and will get back to you shortly.</p>
            <p>Here are the next steps:</p>
            <ul>
                <li>Our team will review your message.</li>
                <li>An admin will contact you to discuss your needs.</li>
                <li>If we proceed, you will receive login credentials for our client portal.</li>
            </ul>
            <p>Best regards,<br/>The Zemaydar.net Team</p>
        `,
    };

    try {
        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(clientMailOptions);
        res.status(200).json({ message: 'Form submitted successfully. A confirmation email has been sent.' });
    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({ message: 'Failed to send emails.' });
    }
};

const handleFileUpload = async (req, res) => {
    const { planName, clientName, clientEmail } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    
    const mailOptions = {
        from: `"Zemaydar.net System" <${process.env.EMAIL_USER}>`,
        to: 'info@zemaydar.net',
        subject: `File Upload for Plan: ${planName}`,
        html: `
            <h3>New File Uploaded by a Client</h3>
            <p><strong>Client Name:</strong> ${clientName}</p>
            <p><strong>Client Email:</strong> ${clientEmail}</p>
            <p><strong>Selected Plan:</strong> ${planName}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            <p>The client's file is attached to this email.</p>
        `,
        attachments: [
            {
                filename: file.originalname,
                content: file.buffer,
            },
        ],
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'File uploaded and sent successfully!' });
    } catch (error) {
        console.error('File upload email error:', error);
        res.status(500).json({ message: 'Failed to send file.' });
    }
};

module.exports = { handleDataForm, handleFileUpload, upload };