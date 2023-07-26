import { transporter } from '../utils/nodemailer.js'


export const sendMessage = async (email, code, amount) => {
    console.log(email, code, amount);
    try {
        await transporter.sendMail({
            from: 'FASHION',
            to: email,
            subject: 'Purchase order',
            html: `<div>
                        <h1>Thank you for shopping at FASHION</h1>\n
                        <p>your order will be arriving shortly</p>\n
                        <p>Order Resume:</p>\n
                        <ul>
                            <li>Order code: ${code}</li>
                            <li>Total amount: $${amount}</li>
                        </ul>
                    </div>`,
        });
    } catch (error) {
        res.status(500).json({ message: error })
    }
}