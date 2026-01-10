import { Button } from "@heroui/button";
import * as actions from "@/actions";
import { auth } from "@/auth";
import Profile from "@/components/profile";

export default async function Home() {
    const session = await auth()

    return (
        <div>
            <form action={actions.signIn}>
                <Button color="primary" type="submit">
                    Sign In
                </Button>
            </form>
            <form action={actions.signOut}>
                <Button color="success" type="submit">
                    Sign Out
                </Button>
            </form>
            {session?.user ? (
                <>
                    <div>Signed In</div>
                    {/* <div>{JSON.stringify(session.user)}</div> */}
                </>
            ) : (
                <div>Signed Out</div>
            )}
            <Profile />
        </div>
    )
}
