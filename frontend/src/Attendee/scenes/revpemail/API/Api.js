// import axios from "axios";

// const URL = process.env.REACT_APP_SERVER_URL;

// // ***** Get IP Adress
// export const IpAdrress = async ({ setLoading, setIPData }) => {
//     try {
//         let res = await axios.get(
//             `http://api.ipstack.com/check?access_key=${process.env.REACT_APP_IP_ADRRSS_API_KEY}`
//         );
//         if (res) {
//             setLoading(false);
//             setIPData(res.data.country_name);
//         }
//     } catch (error) {
//         alert(`IP Adress Error: ${error}`);
//         setLoading(false);
//     }
// };

// // ******* Send message
// export const SendMessage = async ({
//     fullName,
//     email,
//     phone,
//     message,
//     setSend,
// }) => {
//     try {
//         const datas = { fullName, email, phone, message };
//         let res = await axios.post(`${URL}/send`, datas);
//         if (res) {
//             setSend(res.data);
//         }
//     } catch (error) {
//         alert(error.response.data.msg);
//     }
// };
