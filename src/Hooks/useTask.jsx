import { useQuery } from "react-query"
import useAxiosPublic from "./useAxiosPublic"

const useTask = () => {
    const axiosPublic = useAxiosPublic()
  
    const {data: tasks = [], isPending: loading, refetch } = useQuery({
        queryKey:['tasks'],
        queryFn: async()=>{
            const res  = await axiosPublic.get('/task');
            return res.data;
        }
    })
    return [tasks, loading, refetch]
};

export default useTask;