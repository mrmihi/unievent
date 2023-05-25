import axios from "axios";

// ****** Get IP adrress
export const IpAddress = async ({ setLoading, setIpData }) => {
  try {
    let res = await axios.get(
      "http://api.ipstack.com/check?access_key=c1611048089c513c9658afbbcb8f1b6e"
    );
    if (res) {
      setLoading(false);
      setIpData(res.data.country_name);
    }
  } catch (error) {
    alert(`IP address Error: ${error}`);
  }
};

// *********** Send email
export const SendEmail = async ({ fullName, email, message, setSend }) => {
  try {
    const datas = { fullName, email, message };
    let res = await axios.post("/api/client/send", datas);
    if (res) {
      setSend(res.data);
    }
  } catch (error) {
    alert(error.response.data.message);
  }
};
