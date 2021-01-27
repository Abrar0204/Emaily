import sendGrid from 'sendgrid';
const helper = sendGrid.mail;

class Mailer extends helper.Mail {
	constructor({ subject, recipients }, template) {
		super();

		this.sgAPI = sendGrid(process.env.SENDGRID_KEY);

		this.from_email = new helper.Email('abrarhasanofficial@gmail.com');
		this.subject = subject;
		this.recipients = this.formatAddresses(recipients);
		this.body = new helper.Content('text/html', template);

		this.addContent(this.body);
		this.addClickTracking();
		this.addRecipients();
	}

	formatAddresses(recipients) {
		// console.log(recipients);
		return recipients.map(({ email }) => new helper.Email(email));
	}

	addClickTracking() {
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);
		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}

	addRecipients() {
		const personalize = new helper.Personalization();
		this.recipients.forEach((recipient) => personalize.addTo(recipient));
		this.addPersonalization(personalize);
	}

	async send() {
		const request = this.sgAPI.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON()
		});

		const response = this.sgAPI.API(request);

		return response;
	}
}

export default Mailer;
