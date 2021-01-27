import dotenv from 'dotenv';
dotenv.config();
export default (survey) => {
	return `
        <html>
            <body>
                <div style="text-align:center">
                    <h3>We would love to hear your input.</h3>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${process.env.REDIRECT_DOMAIN}/api/surveys/thanks">Yes</a>
                    </div>
                    <div>
                        <a href="${process.env.REDIRECT_DOMAIN}/api/surveys/thanks">No</a>
                    </div>
                </div>
            <body>
        </html>
    `;
};
