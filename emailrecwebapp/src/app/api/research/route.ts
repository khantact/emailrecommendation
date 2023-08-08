import { doc, getDocs, collection, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/utils/firebase";
import nodemailer from 'nodemailer';
const API_KEY = process.env.SPRINGER_API_KEY;

export async function GET(request: Request) {
   const collectionRef = collection(db, 'users');
   try {
        const querySnap = await getDocs(collectionRef);
        querySnap.forEach((document) => {
            var numPapers = 1;
            const id = document.id;
            const preferences = document.data().preferences;
            const email = document.data().email;
            const name = document.data().fullName;
            var papersRecieved = document.data().papersRecieved;
            var excludeDOI = "";
            const recomendationsEnabled = document.data().recommendationsEnabled;
            switch (preferences.length) {
                case 0: return;
                case 1: numPapers = 7;
                case 2: numPapers = 3;
                case 3: numPapers = 2;
                case 4: numPapers = 3;
            }
            if (recomendationsEnabled) {
                /*
                * This block of code ensures the user does not get recommended a paper that they have been sent before
                */
                preferences.forEach(async (preference : string) => {
                    var papersSent = document.data().papersSent;
                    preference = preference.replaceAll(" ", "+");
                    // From database
                    if (papersRecieved) {
                        papersRecieved.forEach((doi:string) => {
                            doi = doi.substring(doi.indexOf(">")+1);
                            excludeDOI += " AND -(doi:"+doi+")";
                        })
                    }
                    const apiUrl = `https://api.springernature.com/meta/v2/json?api_key=${API_KEY}&q=keyword:${preference}${excludeDOI}&p=${1}`;
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    const seenDOIs = data.records.map((record : any) => record.doi);                
                    const userRef = doc(db, 'users', id);
                    seenDOIs.forEach((doi : string) => {
                        updateDoc(userRef, {
                            papersReceived: arrayUnion(preference + ">" + doi),
                            papersSent: papersSent + 1,
                        })
                    })
                })
                /*
                * This block of code should handle the styling of the email and sending of email
                */
                const config = {
                    service : 'gmail',
                    auth : {
                        user : process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }
                }
                const transporter = nodemailer.createTransport(config);
                const message = {
                    from: process.env.EMAIL,
                    to : 'kevinhan0@gmail.com',
                    subject: 'Lorem - Research Recommendations',
                    html: `<h1>Test</h1>`,
                    text: 'Test'
                }
                transporter.sendMail(message, (err, info) => {
                     if (err) {
                          console.log(err);
                     } else {
                        //   console.log(info);
                     }
                })
            }
    });
   } catch (err) {
    console.log(err);
   }
    return new Response("Hello world", { status: 200 });
}