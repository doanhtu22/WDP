import express from 'express';
import nodemailer from 'nodemailer';

const sendConfirmationEmail = async (booking) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'touristic.business@gmail.com',
            pass: 'Hieu1234',
        },
    });

    const mailOptions = {
        from: 'touristic.business@gmail.com',
        to: booking.userEmail,
        subject: 'Booking Confirmation',
        text: `Dear ${booking.fullName},\n\nYour booking for the tour "${booking.tourName}" has been confirmed.
        Here is booking details: ${booking.fullName}
        \n\n Number of adults: ${booking.adult}
         \n\nNumber of children: ${booking.children}
         \n\n Number of baby:${booking.baby}
         \n\nTour date: ${booking.bookAt}
         \n\nTotal price: $${booking.price}\n\n
       
         Thank you for booking with us!\n\nBest regards,\nYour Company`,
    };

    await transporter.sendMail(mailOptions);
};

export default sendConfirmationEmail;
