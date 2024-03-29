import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import NewTask from '@/components/NewTask/NewTask'
import Tasks from '@/components/Tasks/Tasks'
import useHttp from '@/hooks/use-http'

export default function Home() {
  const [tasks, setTasks] = useState([])

  const { isLoading, error, sendRequest: fetchTasks } = useHttp()

  useEffect(() => {
    const transformTasks = (tasksObj) => {
      const loadedTasks = []
  
      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text })
      }
  
      setTasks(loadedTasks)
    }

    fetchTasks(
      {url: 'https://react-http-fb501-default-rtdb.europe-west1.firebasedatabase.app/task.json'},
      transformTasks
    )
  }, [fetchTasks])

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  }
  return (
    <>
      <Head>
        <title>React Task Manager</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Fragment>
          <NewTask onAddTask={taskAddHandler} />
          <Tasks
            items={tasks}
            loading={isLoading}
            error={error}
            onFetch={fetchTasks}
          />
        </Fragment>
      </main>
    </>
  )
}
