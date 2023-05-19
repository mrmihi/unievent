const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const userEmail = 'sapudev2@gmail.com';
const userPassword = 'evylreflflngkldi';

const SendPriceDropMail = async (
  emails,
  venueName,
  priceDropPercentage,
  venueImage,
  discountedPrice,
  originalPrice
) => {
  priceDropPercentage = priceDropPercentage.toFixed(2);
  discountedPrice = '$' + discountedPrice.toFixed(2);
  originalPrice = '$' + originalPrice.toFixed(2);

  const venuePriceDropTemplate = `
    <html>
    <head>
        <title>Price Drop Alert</title>
        <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #eef5fc;
            margin: 0;
            padding: 0;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
        }
        
        h1 {
            color: #1976d2;
            margin-top: 0;
            font-size: 36px;
        }
        
        p {
            color: #424242;
            font-size: 18px;
        }
        
        .price {
            font-size: 24px;
            font-weight: bold;
            color: #1976d2;
            margin-bottom: 20px;
        }
        
        .percentage {
            display: inline-block;
            background-color: #1976d2;
            color: #fff;
            padding: 5px 10px;
            font-size: 18px;
            font-weight: bold;
            border-radius: 5px;
            margin-left: 10px;
        }
        
        .image-container {
            margin-top: 20px;
            text-align: center;
        }
        
        .image-container img {
            max-width: 100%;
            height: auto;
        }
        
        .cta {
            background-color: #1976d2;
            color: #fff;
            display: inline-block;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            margin-top: 20px;
            font-size: 18px;
            font-weight: bold;
        }
        
        .cta:hover {
            background-color: #0d47a1;
        }        
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Price Drop Alert!</h1>
            <p>Dear happy customer,</p>
            <p>We wanted to let you know that the price of the ${venueName} has dropped by ${priceDropPercentage}%, and you can now book it at a discounted rate of ${discountedPrice}!</p>
            <p>Hurry and book now to take advantage of this amazing deal. This offer is only available for a limited time.</p>
            <div class="price">Original Price: ${originalPrice} <span class="percentage">-${priceDropPercentage}%</span></div>
            <div class="price">Discounted Price: ${discountedPrice}</div>
            <div class="image-container">
                <img src="${venueImage}" alt="${venueName}">
            </div>
            <a href="" class="cta">Check it out</a>
        </div>
    </body>
    </html>`;

  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: userEmail,
      pass: userPassword,
    },
  });

  for (const email of emails) {
    console.log(email);
    let details = {
      from: userEmail,
      to: email,
      subject: `Last chance to book at a discounted rate - Price Drop Alert at ${venueName}`,
      html: venuePriceDropTemplate,
    };

    mailTransporter.sendMail(details, function (err, data) {
      if (err) {
        console.error(err);
      } else {
        console.log('Email sent successfully');
      }
    });
  }
};

module.exports = SendPriceDropMail;
