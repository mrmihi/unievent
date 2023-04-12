import nodemailer from "nodemailer";

const Email = (options) => {
    let transpoter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER, // email
            pass: process.env.PASSWORD, //password
        },
    });
    transpoter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
            return;
        }
    });
};

// send email
const EmailSender = ({ fullName, email, message }) => {
    const options = {
        from: `Event 📅 <${process.env.USER}>`,
        to: email,
        subject: "From EvenT-X",
        html: `
        <div style="width: 100%; background: #5433FF;  /* fallback for old browsers */
                background: -webkit-linear-gradient(to right, #A5FECB, #20BDFF, #5433FF);  /* Chrome 10-25, Safari 5.1-6 */
                background: linear-gradient(to right, #A5FECB, #20BDFF, #5433FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
               ;padding: 5rem 0">
        
        <div style="max-width: 900px; height : 100%; background-color: white; margin: 0 auto">
          <div style="width: 100%; background-color: #BDD4E7; padding: 20px 0">
          <a href="${process.env.CLIENT_URL}" ><img
              src="https://res.cloudinary.com/wizardxd/image/upload/v1678798225/New/6490329_2171_yblg27.jpg"
              style="width: 100%; height: 480px; object-fit: contain"
            /></a> 
           
          </div>
          <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
            <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
              Form Event-X
            </p>
            <div style="font-size: .8rem; margin: 0 30px">
              <p>FullName: <b>${fullName}</b></p>
              <p>Message: <i>${message}</i></p>
            </div>
          </div>
        </div>
      </div>
        `,
    };

    Email(options);
};

export default EmailSender;
