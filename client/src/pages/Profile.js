import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME_LOGS } from "../utils/queries";
import PreviousLogs from "../components/PreviousLog";
import Auth from "../utils/auth";

const Profile = () => {
  const user = Auth.getProfile();

  let previousLogs = [];

  const meLogsResult = useQuery(QUERY_ME_LOGS, {
    fetchPolicy: "no-cache",
    variables: { email: user.data.email },
  });

  if (meLogsResult && meLogsResult.data && meLogsResult.data.meLogs) {
    previousLogs = meLogsResult.data.meLogs;
  }

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header text-center">
        <h1>Welcome to The Jobsite Work Logger!</h1>
      </div>
      <div className="card-footer text-center m-3">
        <h2>Ready to log todays work?</h2>
        <Link to="/createform">
          <button className="btn btn-lg btn-danger">Create worklog!</button>
        </Link>
      </div>
      <div className="card-body m-5">
        <h2>Here are your previous days' logs:</h2>
        <PreviousLogs logs={previousLogs} />
      </div>
    </div>
  );
};

export default Profile;
