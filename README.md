# EmailRecommendation
<h1>Summary</h1>
<p>This website takes in user preferences and subscribes the user to a weekly newsletter that recommends research papers based on user preference</p>

<img width="1440" alt="image" src="https://github.com/khantact/emailrecommendation/assets/96499197/c9b242f3-98bf-4377-a067-2d6e0beac0d1">

The deployed site can be accessed at https://loremr.vercel.app/. The website is still under development so it may contain bugs
<br>
<h1>Frontend Techstack</h1>
<h2>Tailwind</h2>
<p>Comes prepackaged with Next.js which is the framework for the website</p>
<p>Really simplifies CSS, and man do I dislike having to look up tutorials on how to center my divs only to break the entire site</p>
<h1>Backend APIs</h1>
<h2>Springer API</h2>
<p>This is the API that we rely upon to supply the research papers we deliver to our users, the code for this can be found in our api/research folder</p>
<h2>Firebase API</h2>
<p>This is a simple database service that Google provides for free and we use this to store our users, their preferences, papersSent, etc.</p>
