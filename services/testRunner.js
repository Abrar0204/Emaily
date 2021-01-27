import sendGrid from '@sendgrid/mail';

sendGrid.setApiKey(process.env.SENDGRID_KEY);
const msg = {
	to: 'abrarhasan0204@gmail.com', // Change to your recipient
	from: 'abrarhasanofficial@gmail.com', // Change to your verified sender
	subject: 'Sending with SendGrid is Fun',
	text: 'and easy to do anywhere, even with Node.js',
	html: '<strong>and easy to do anywhere, even with Node.js</strong>'
};

export default () => {
	sendGrid
		.send(msg)
		.then(() => {
			console.log('Email sent');
		})
		.catch((error) => {
			console.error(error);
		});
};
