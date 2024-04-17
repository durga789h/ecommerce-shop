import React from 'react';
import Layout from '../components/Layout/Layout';
import { BiCheckCircle } from 'react-icons/bi';

const About = () => {
  return (
    <Layout title={"about us-Ecommerce app"}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <div className="flex flex-col md:flex-row mb-8">
          <div className="md:w-1/2">
            <img src="/images/about_us.webp" alt="About Us" className="rounded-lg shadow-md" />
          </div>
          <div className="md:w-1/2 md:ml-4">
            <p className="mb-4">
              Welcome to our ecommerce store! We're dedicated to providing you with the best online shopping experience,
              with a focus on dependability, customer service, and uniqueness.
            </p>
            <p className="mb-4">
              We started as a small team passionate about delivering quality products to customers worldwide. Over the
              years, we've grown into a thriving ecommerce business, expanding our product range and improving our services.
            </p>
            <p className="mb-4">
              Our mission is to offer an unparalleled selection of products, excellent customer service, and seamless
              shopping experience. We strive to exceed your expectations every time you shop with us.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Why Choose Us?</h2>
            <ul className="list-disc ml-6 mb-4">
              <li className="mb-2">
                <span className="text-green-500 mr-2"><BiCheckCircle /></span>
                Wide Range of Products: We offer a diverse collection of products to cater to your every need.
              </li>
              <li className="mb-2">
                <span className="text-green-500 mr-2"><BiCheckCircle /></span>
                Quality Assurance: We ensure that every product meets high-quality standards before it reaches you.
              </li>
              <li className="mb-2">
                <span className="text-green-500 mr-2"><BiCheckCircle /></span>
                Exceptional Customer Service: Our dedicated support team is here to assist you with any queries or concerns.
              </li>
              <li className="mb-2">
                <span className="text-green-500 mr-2"><BiCheckCircle /></span>
                Secure Shopping: We prioritize the security of your personal information and transactions.
              </li>
            </ul>
            <p>
              Thank you for choosing us as your preferred online shopping destination. We look forward to serving you!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
