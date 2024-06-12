import CardContainer from "../../../components/CardContainer"
import PlayerCard from "./PlayerCard";

export default function EventPlayers({ players, owner, handleDeleteUser }) {
    return (
        <div className="bg-white rounded-xl p-4 max-h-[80vh]">
            <div className="sticky top-0 bg-white w-full">
                <div className="text-2xl py-2 font-semibold ">Event Playerlist</div>
                <hr className="border mb-2 border-zinc-200" />
            </div>
            <div className="bg-white min-h-full rounded-xl p-4 max-h-[70vh] overflow-auto">
                <CardContainer display="flexCol">
                    {players.map(player =>
                        <PlayerCard key={player.playerId} user={player.users} userId={player.playerId} owner={owner} handleDeleteUser={handleDeleteUser} />
                    )}
                </CardContainer>
            </div>
        </div>
    )
}
