import './faq.styles.scss'
const Faq = () => {
    console.log('Inside FAQ')
    return (
        <div className="mentorship-faq">
            <h1>Mentorship FAQ</h1>
            <div className="faq-content">
                <div className="question">How does this work?</div>
                <p>
                    You can view the mentors under the Industry Areas of Focus for your "track".
                    As a reminder, the three tracks are:
                </p>

                <p>
                    <b>Production Track:</b> Cellar/Production and Viticulture <br />
                    <b>Sales Track:</b> Retail, Sales & Distribution, Hospitality<br />
                    <b>Brand Management Track:</b> Marketing & Communications, Wine Business<br />
                </p>
                <p>
                    You can select up to 3 mentors (minimum: 1, maximum 3) from your “track list”. Mentor selection is <b>FIRST COME, FIRST SERVE</b>. <br />
                    Once you click on a mentor, your selection is FINAL.<br />
                    In case of errors, please contact <span className='email'>mentorship@batonnageforum.com</span> <br />
                </p>

                <div className='question'>Why can’t I click on a Mentor?</div>
                <p>
                    If your Mentor is tagged "List Full", this means that their mentee intake list is full. If you are interested in speaking with a mentor, contact  <span className='email'>mentorship@batonnageforum.com</span> to get added to a waitlist. We cannot guarantee that you will be connected with the mentor as this is decided on a case by case basis and mentor availability.
                    <br />
                    In case of any other errors, try refreshing your browser. We recommend that you use Google Chrome for optimal functionality. It is preferred that you use a desktop for better reads instead of a phone/tablet.
                </p>

                <div className="question">How do I know which mentor I should pick?</div>
                <p>
                    Click on the Mentor name to read their full bio. This will help you decide if they are a good match for you based on your current interests, skills, geographical location, etc.
                    For additional support, contact your IAF Head or Mentee Liaison Officer. Contact information is below:
                    <br />
                    <br />

                    <table>
                        <thead>
                            <tr>
                                <th>IAF Heads</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Preferred E-mail</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Retail</td>
                                <td>Annette</td>
                                <td>Alvarez Peters</td>
                                <td>annetteapeters@gmail.com</td>
                            </tr>
                            <tr>
                                <td>Cellar/Production</td>
                                <td>Jessica</td>
                                <td>Koga</td>
                                <td>jkoga@schramsberg.com</td>
                            </tr>
                            <tr>
                                <td>Sales/Distribution</td>
                                <td>Anitha</td>
                                <td>Gandhi</td>
                                <td>anitha.gandhi@gmail.com</td>
                            </tr>
                            <tr>
                                <td>Hospitality</td>
                                <td>Liz</td>
                                <td>Martinez</td>
                                <td>lizwineacct@gmail.com</td>
                            </tr>
                            <tr>
                                <td>Marketing/Communications</td>
                                <td>Katie</td>
                                <td>Canfield</td>
                                <td>katie@odonnell-lane.com</td>
                            </tr>
                            <tr>
                                <td>Viticulture</td>
                                <td>Mary</td>
                                <td>Maher</td>
                                <td>mary@silveradofarming.com</td>
                            </tr>
                            <tr>
                                <td>Wine Business</td>
                                <td>Emily</td>
                                <td>Porter</td>
                                <td>emilyporter.winebusiness@gmail.com</td>
                            </tr>
                            <tr>
                                <td>Mentorship Director</td>
                                <td>Priyanka</td>
                                <td>French</td>
                                <td>mentorship@batonnageforum.com</td>
                            </tr>
                            <tr>
                                <td>Executive Director</td>
                                <td>Michelle</td>
                                <td>Schromm</td>
                                <td>info@batonnageforum.com</td>
                            </tr>
                            <tr>
                                <td>Mentee Liaison Officer</td>
                                <td>Terah</td>
                                <td>Bajjalieh</td>
                                <td>terahcb@gmail.com</td>
                            </tr>
                        </tbody>
                    </table>
                </p>


                <div className='question'>How do I know which Mentors I am able to interact with?</div>
                <p>You will receive email confirmations with your mentor final lists. Additionally you can log into the account on this platform to view your final mentor lists as well. This will be available on Feb 11th, 2024.</p>

                <div className='question'>I haven’t heard from my Mentor, what do I do?</div>
                <p>
                    If you haven’t received any contact or communication from any Mentors by April 10th, 2024, please contact mentorship@batonnageforum.com. Additionally your IAF heads are also available to help connect you with your mentors as well.
                </p>

            </div >
        </div >
    );
}

export default Faq;