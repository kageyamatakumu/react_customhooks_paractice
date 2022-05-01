// 全ユーザー一覧を取得するカスタムフック
import { useState } from "react";
import { UserProfile } from "../types/userProfile";
import { User } from "../types/api/User";
import axios from 'axios';


export const useAllUsers = () => {
    const [userProfiles, SetUserProfiles] = useState<Array<UserProfile>>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getUsers = () => {
        setLoading(true);
        axios.get<Array<User>>("https://jsonplaceholder.typicode.com/users")
            .then((result) => {
                const data = result.data.map((user) => ({
                    id: user.id,
                    name: `${user.name}(${user.username})`,
                    email: user.email,
                    address: `${user.address.city}${user.address.suite}${user.address.street}`
                }));
                SetUserProfiles(data);
            }).catch(() => {
                setError(true);
            }).finally(() => {
                setLoading(false);
            })
    };

    return { getUsers, userProfiles, loading, error };
};
