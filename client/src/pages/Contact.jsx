import React from 'react';
import Layout from '../components/Layout/Layout';
import { BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi';
import images from "../../public/images/contact_us.jpg";

const Contact = () => {
  return (
    <div className="container mx-auto px-4">
      <Layout title={"contact-us"}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className='mt-8'>
            <img src={images} alt="img" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">Contact us</h1>
            <p className="mb-4">Any query and info about the product, feel free to call anytime. We are available 24*7.</p>
            <p className="flex items-center mb-2"><BiMailSend className="mr-2" /> <span>www.help@ecommerceapp.com</span></p>
            <p className="flex items-center mb-2"><BiPhoneCall className="mr-2" /> <span>012-3456789</span></p>
            <p className="flex items-center"><BiSupport className="mr-2" /> <span>1800-0000-0000 (toll-free)</span></p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Contact;
