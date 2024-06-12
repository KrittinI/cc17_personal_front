import { Link } from "react-router-dom";
import Avatar from "../../../components/Avatar";

export default function PlayerCard({ user, userId, owner, handleDeleteUser }) {

    return (
        <div className="flex px-3 py-1.5 bg-zinc-200 hover:bg-zinc-300 justify-between items-center rounded-lg shadow">
            <Link className="flex-1 flex gap-4 items-center" to={`/users/${userId}`}>
                <Avatar src={user.profileImage} />
                <div className="text-xl">{user.userName}</div>
            </Link>
            {owner
                ? <button role="button"
                    className="text-red-500 h-10 w-10 text-2xl flex items-center hover:text-3xl text-center justify-center"
                    onClick={() => handleDeleteUser(userId)}
                >
                    &#10006;
                </button>
                : <></>
            }
        </div>
    )
}
