import useFetch from '../hooks/useFetch'

const URL = `https://hacker-news.firebaseio.com/v0/jobstories.json`

interface Job {
    id: number;
    title: string;
    by: string;
}

interface JobItemProps {
    job: number;
}

const JobItem = ({ job }: JobItemProps) => {

    const NEW_URL = `https://hacker-news.firebaseio.com/v0/item/${job}.json`;
    const { data, isLoading, error } = useFetch<Job | null>({ URL: NEW_URL, initialData: null });

    if (isLoading) return <li>Loading details for job #{job}...</li>;
    if (error) return <li>Error loading job #{job}: {error}</li>;
    if (!data) return null;

    return (
        <div>
            <h3>{data.title}</h3>
            <p> by {data.by}</p>
        </div>
    )
}

const NestedFetchofJobs = () => {

    const { data, isLoading, error } = useFetch<number[]>({ URL, initialData: [] });

    if(isLoading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>{error}</p>
    }

    const displayIds = data.slice(0, 6);

  return (
    <div>
      { displayIds.map((jobId) => (
        <JobItem key={jobId} job={jobId}/>
      ))}
    </div>
  )
}

export default NestedFetchofJobs
