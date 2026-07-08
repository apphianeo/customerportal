export type HelpTopicKey = 'getting-started' | 'policies' | 'payments' | 'account'

type Faq = { question: string; answer: React.ReactNode }
export type TopicContent = { breadcrumbLabel: string; title: string; faqs: Faq[] }

const LINK = 'text-[#005eb8] underline'

export const TOPICS: Record<HelpTopicKey, TopicContent> = {
  'getting-started': {
    breadcrumbLabel: 'Getting Started',
    title: 'Getting Started',
    faqs: [
      {
        question: 'How do I access the UOI Customer Portal?',
        answer: (
          <p>
            You can access the UOI Customer Portal at any time through your web browser on desktop or mobile. Visit the portal URL and log in using your Singpass app, or your NRIC/FIN number and password. No app download is required — the portal is fully accessible via your mobile browser.
          </p>
        ),
      },
      {
        question: 'How do I create a new account?',
        answer: (
          <>
            <p>You can register for a Customer Portal account in two ways:</p>
            <ul>
              <li>Via Singpass: Tap 'Log in with Singpass' and follow the on-screen instructions. Singpass will pre-fill your personal details automatically.</li>
              <li>Via NRIC/FIN: Tap 'Log in with NRIC/FIN', then select 'Create an Account' and enter your details manually.</li>
            </ul>
            <p>
              If you experience any issues during registration, please contact us at{' '}
              <a href="#" className={LINK}>help@uoi.com.sg</a>.
            </p>
          </>
        ),
      },
      {
        question: 'What can I do on the UOI Customer Portal?',
        answer: (
          <>
            <p>The Customer Portal lets you manage all your UOI insurance needs in one place, including:</p>
            <ul>
              <li>View all your active policies (Travel, Home, Motor, Helper, Personal Accident)</li>
              <li>Submit and track insurance claims</li>
              <li>Download policy documents and renewal notices</li>
              <li>Update your personal and contact information</li>
              <li>Access your rewards and promotions</li>
              <li>Make premium payments and view payment history</li>
            </ul>
          </>
        ),
      },
    ],
  },
  policies: {
    breadcrumbLabel: 'Policies',
    title: 'Policies',
    faqs: [
      {
        question: 'How do I view my active policies?',
        answer: (
          <p>
            All your active UOI policies are displayed on your Dashboard under 'Your Coverage'. Tap any policy card to view its full details, including coverage period, insured persons, policy number, and benefit limits. You can also access all policies by tapping 'Policies' in the navigation menu.
          </p>
        ),
      },
      {
        question: "What does 'Not Covered' mean on a policy card?",
        answer: (
          <p>
            'Not Covered' means you do not currently hold an active policy for that insurance category. You can purchase a new policy by tapping 'Get Quote' on the card, or by visiting{' '}
            <a href="#" className={LINK}>uoi.com.sg</a>. Coverage categories shown on your dashboard include Travel, Home, Motor, Helper, and Personal Accident.
          </p>
        ),
      },
      {
        question: 'How do I download my policy documents?',
        answer: (
          <>
            <p>To download your policy documents:</p>
            <ol>
              <li>Go to 'Policies' in the navigation</li>
              <li>Select the relevant policy</li>
              <li>Tap the 'Documents' tab</li>
              <li>Tap the download icon next to the document you need</li>
            </ol>
            <p>Available documents include your policy schedule, renewal notices, and certificate of insurance.</p>
          </>
        ),
      },
      {
        question: 'How do I renew my policy?',
        answer: (
          <p>
            If your policy is due for renewal, you will receive a notification via email. You can also initiate renewal directly from the portal by viewing your policy details and tapping 'Renew'. Annual policies are typically renewable 30 days before expiry. For assisted renewal, please contact us at{' '}
            <a href="#" className={LINK}>contactus@uoi.com.sg</a> or call (+65) 6222 7733.
          </p>
        ),
      },
      {
        question: 'Can I make changes to an existing policy?',
        answer: (
          <p>
            Certain policy amendments can be made through the portal, such as updating contact details or adding insured persons. For structural changes to your policy (e.g. changing coverage limits or plan type), please contact our team at{' '}
            <a href="#" className={LINK}>contactus@uoi.com.sg</a>. If your policy was purchased via an agent, please reach out to your agent directly for amendments.
          </p>
        ),
      },
      {
        question: 'How do I view my payment history for a policy?',
        answer: (
          <p>
            Payment history is available under each policy's detail page. Navigate to 'Policies', select your policy, and tap the 'Payment History' tab. You will see a list of past transactions including payment dates, amounts, and payment methods.
          </p>
        ),
      },
    ],
  },
  payments: {
    breadcrumbLabel: 'Payment',
    title: 'Payment',
    faqs: [
      {
        question: 'Where can I view my upcoming premium payments?',
        answer: (
          <p>
            Your upcoming payment schedule is shown in each policy's 'Payment History' tab under Policies. If you are enrolled in GIRO, your premium will be automatically deducted on the due date. You will also receive an email reminder 14 days before your premium is due.
          </p>
        ),
      },
      {
        question: 'My payment failed. What should I do?',
        answer: (
          <>
            <p>If your payment did not go through:</p>
            <ol>
              <li>Check that your card details are up to date</li>
              <li>Ensure sufficient funds are available</li>
              <li>Try an alternative payment method</li>
              <li>If the issue persists, contact your bank or contact us at contactus@uoi.com.sg</li>
            </ol>
            <p>Please ensure your premium is paid before the due date to avoid a lapse in coverage.</p>
          </>
        ),
      },
      {
        question: 'How do I set up or cancel GIRO payments?',
        answer: (
          <p>
            To set up GIRO, please download and complete the GIRO form available at{' '}
            <a href="#" className={LINK}>uoi.com.sg/contact-us</a> under 'Forms', and mail it to us at 146 Robinson Road #02-01 UOI Building, Singapore 068909. To cancel an existing GIRO arrangement, contact us at{' '}
            <a href="#" className={LINK}>contactus@uoi.com.sg</a> or call (+65) 6222 7733.
          </p>
        ),
      },
    ],
  },
  account: {
    breadcrumbLabel: 'Account & Settings',
    title: 'Account & Settings',
    faqs: [
      {
        question: 'How do I update my contact details?',
        answer: (
          <>
            <p>To update your mobile number, email address, or mailing address:</p>
            <ol>
              <li>Log in to the portal</li>
              <li>Tap your profile icon at the top right</li>
              <li>Go to 'Account Settings'</li>
              <li>Update your details and tap 'Save Changes'</li>
            </ol>
            <p>
              Changes will take effect immediately. If you need to update your NRIC or legal name, please contact us directly at{' '}
              <a href="#" className={LINK}>contactus@uoi.com.sg</a> with a copy of your identification document.
            </p>
          </>
        ),
      },
      {
        question: 'How do I close or deactivate my portal account?',
        answer: (
          <p>
            To deactivate your Customer Portal account, please contact us at{' '}
            <a href="#" className={LINK}>contactus@uoi.com.sg</a> with your full name, NRIC, and request for account deactivation. Please note that account deactivation does not cancel any active insurance policies. Active policies will continue until their expiry date.
          </p>
        ),
      },
    ],
  },
}
