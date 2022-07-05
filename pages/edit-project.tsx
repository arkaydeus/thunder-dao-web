import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import ProjectRules from '../components/ProjectRules'
import ProjectRulesForm from '../components/ProjectRulesForm'
import { useNftfiContext } from '../context/NftfiContext'

const EditProject: NextPage = () => {
  const { offerRules } = useNftfiContext()

  const router = useRouter()
  const { projectKey } = router.query

  let key: string | undefined

  if (Array.isArray(projectKey)) {
    key = projectKey[0]
  } else {
    key = projectKey
  }

  return (
    <div>
      <Head>
        <title>Edit: {key}</title>
        <meta name='description' content='Current loans' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout>
        <div className='px-0 py-8 text-white md:px-16 max-w-7xl'>
          <div className='mt-8 text-2xl text-center md:mt-8 md:text-5xl'>
            Edit Project
          </div>
          <div className='xl:grid xl:grid-cols-2 xl:gap-6'>
            {offerRules && key && offerRules[key] && (
              <ProjectRulesForm
                projectRule={offerRules[key]}
                projectName={key}
              />
            )}
          </div>
        </div>
      </Layout>

      <footer></footer>
    </div>
  )
}

export default EditProject
