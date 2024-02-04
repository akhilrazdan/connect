import { downloadSignupReport, getAdminStatistics } from "../../utils/firebase/connect-api.utils";
import MenteesNotSignedUp from "../mentees-not-signed-up/mentees-not-signed-up.component";
import { useEffect, useState } from "react";
import "./dashboard.styles.scss";


const Dashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const statistics = await getAdminStatistics();
                setStats(statistics);
            } catch (error) {
                console.error('Failed to load admin statistics:', error);
                // Handle error (show error message, etc.)
            }
        };

        loadStats();
    }, []);

    if (!stats) {
        return <div>Loading statistics...</div>;
    }
    const handleDownloadClick = async () => {
        try {
            await downloadSignupReport();
            console.log('Report download initiated.');
        } catch (error) {
            console.error('Error downloading report:', error);
            // You can also show an error message to the user if needed
        }
    };


    return (
        <div className="dashboard">
            <h2 className="dashboard-title">Admin Statistics</h2>

            <div className="statistics-section">
                <p>Total Unique Mentees signed up: {stats.totalUniqueMentees}</p>
                <p>Total Unique Mentors signed up: {stats.totalUniqueMentors}</p>
                <p>Mentees Not Signed Up based on whitelist: {stats.menteesNotSignedUp.length}</p>
            </div>
            <MenteesNotSignedUp mentees={stats.menteesNotSignedUp} />
            <div className="signups-section">
                <h2>Signups</h2>
                <button className="download-button" onClick={handleDownloadClick}>
                    Download Signups
                </button>
            </div>
        </div>
    )
}
export default Dashboard;