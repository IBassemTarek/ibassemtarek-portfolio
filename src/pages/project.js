import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import profilePic from "../../public/images/profile/photograph.jpg";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import TransitionEffect from "@/components/TransitionEffect";

const content = `<h2>Project description</h2>

<p>I work as a Backend Developer and Mobile App Developer at Montu. I build and maintain scalable infrastructure using NestJS, integrate services, write clean code, and troubleshoot issues. I also develop and enhance Montu&rsquo;s mobile app, implementing new features and improving user experience. <a href="https://www.montuapps.com/">view project</a></p>

<hr />
<h2>Skills and deliverables</h2>

<p>Shopify -&nbsp;React Native -&nbsp;PostgreSQL -&nbsp;DevOps -&nbsp;Docker -&nbsp;Docker Compose -&nbsp;GraphQL -&nbsp;JavaScript</p>

<hr />
<h2>How to start using Montu Client?</h2>

<p><strong>Step 1:&nbsp;</strong>Download it from your store (Google Play and App Store) or install it directly using this <a href="https://montuclient.page.link/" target="_new">link</a>&nbsp;from your mobile app.</p>

<p><strong>Step 2:&nbsp;</strong>Upon installing the Montu client app, you&#39;ll have two login options:</p>

<ul>
	<li>Scan the QR code from the merchant dashboard.</li>
	<li>Use the same credentials you use to log in to the merchant dashboard.<br />
	&nbsp;</li>
</ul>

<p><a href="https://cdn.montuapps.com/blog/comprehensive+guide+to+montu+client+mobile+app/1.png" rel="Montu Client Login" target="_blank"><img src="https://cdn.montuapps.com/blog/comprehensive+guide+to+montu+client+mobile+app/1.png" /></a></p>

<hr />
<p>&nbsp;</p>

<h2>Montu Client Features?</h2>

<ol>
	<li>
	<h2>My app tab</h2>

	<p>Within this tab, you&#39;ll find:</p>

	<h2><a href="https://cdn.montuapps.com/blog/comprehensive+guide+to+montu+client+mobile+app/2.jpeg" rel="Montu Client My app" target="_blank"><img src="https://cdn.montuapps.com/blog/comprehensive+guide+to+montu+client+mobile+app/2.jpeg" style="height:905px; width:420px" /></a><br />
	<br />
	What&#39;s the preview feature?<br />
	<span style="font-size:12px">Enables you to visualize how your app appears on a genuine mobile phone, both before and after publication in stores. It instantly displays changes made from the merchant dashboard, providing a real-time representation of the app&#39;s appearance.</span></h2>

	<ol>
		<li>A summary of vital insights, including live sessions and app customers.</li>
		<li>App details such as the app logo, version, and status.</li>
		<li>Convenient access to the app preview feature.</li>
	</ol>
	</li>
	<li>
	<h2>Campaigns</h2>

	<p>In these tabs, you can:</p>

	<ol>
		<li>
		<p>Monitor and generate campaigns directly within the Montu client, bypassing the need for the merchant dashboard.</p>
		</li>
		<li>Create new campaigns with options for instant, repeated, or timed scheduling.</li>
	</ol>

	<h2><a href="https://lh3.googleusercontent.com/drive-viewer/AK7aPaA7Q_28Ec7Av8glsEDLLHmCZcMjLUi3MYudOAV2PcBIPGlDeDxbe9v5cICtYKpCd9hKIeErqcP7uiqii9MbMatHPO-LZQ=s1600" rel="Montu Client Campaigns" target="_blank"><img src="https://lh3.googleusercontent.com/drive-viewer/AK7aPaA7Q_28Ec7Av8glsEDLLHmCZcMjLUi3MYudOAV2PcBIPGlDeDxbe9v5cICtYKpCd9hKIeErqcP7uiqii9MbMatHPO-LZQ=s1600" /></a></h2>
	</li>
	<li>
	<h2>Insights</h2>

	<p>In this section, you can:</p>

	<ol>
		<li>
		<p>Monitor key insights, including total revenue, total orders, average order value, and returning customer rate.</p>
		</li>
		<li>View a comprehensive mobile app revenue graph that covers metrics such as cart abandonment, checkout abandonment, live sessions, session per user, monthly active users, total customers, and conversion rate (including added cart, reached checkout, and session converted).</li>
	</ol>

	<h2><a href="https://lh3.googleusercontent.com/drive-viewer/AK7aPaB0Conzjq2SGoO1FLDuI08uAIVQgsmmLLQ0XgOjKiDkHTxWTCoipbemgRa7mxFddHg_2aVa-s1YciFcaXHz1bLKht5yYg=s1600" rel="Montu Client Insights" target="_blank"><img src="https://lh3.googleusercontent.com/drive-viewer/AK7aPaB0Conzjq2SGoO1FLDuI08uAIVQgsmmLLQ0XgOjKiDkHTxWTCoipbemgRa7mxFddHg_2aVa-s1YciFcaXHz1bLKht5yYg=s1600" /></a></h2>
	</li>
</ol>

<p>&nbsp;</p>

<p><strong>In conclusion</strong>, Montu client emerges as a pivotal tool for Shopify Merchants, revolutionizing the mobile app development landscape with its no-code approach and user-friendly features. From streamlined campaign management to insightful tracking metrics, the app provides a comprehensive solution for enhancing the e-commerce experience. The visual representation offered by the mobile app revenue graph and the dynamic preview feature further underscores Montu client&#39;s commitment to empowering merchants with real-time, actionable data. As the digital marketplace continues to evolve, Montu client stands as a beacon for those seeking a hassle-free and effective means to build, track, and optimize their mobile app presence. Elevate your Shopify store with Montu client &ndash; where simplicity meets sophistication in the world of mobile commerce.</p>`;
const Project = () => {
  return (
    <>
      <Head>
        <title>About - IBassemTarek</title>
        <meta name="description" content="about me" />
      </Head>
      <TransitionEffect />
      <main className="flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text={"Dream Big, Achieve Bigger!"}
            className="mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8 leading-snug"
          />

          <div className="project-details">
            <style jsx global>{`
              .project-details {
                margin: 20px 0;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }

              .project-details h2 {
                color: #fff;
                font-weight: bold;
                margin-bottom: 10px;
              }

              /* Paragraph styles */
              .project-details p {
                line-height: 1.2;
                color: rgba(255, 255, 255, 0.8);
                /* Adjust opacity as needed */
              }

              /* Link styles */
              .project-details a {
                color: #0070f3;
                text-decoration: none;
                transition: color 0.3s;
              }

              .project-details a:hover,
              .project-details a:focus {
                text-decoration: underline;
              }

              /* Image styles */
              .project-details img {
                max-width: 100%;
                height: auto;
                margin-top: 10px;
              }

              /* List styles */
              .project-details ul {
                list-style-type: none;
                padding: 0;
              }

              .project-details li {
                margin-bottom: 8px;
              }

              /* Horizontal rule styles */
              .project-details hr {
                margin-top: 15px;
                margin-bottom: 15px;
              }
            `}</style>

            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Project;
