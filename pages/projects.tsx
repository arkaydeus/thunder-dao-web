import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import ProjectRules from '../components/ProjectRules'
import { useNftfiContext } from '../context/NftfiContext'

const Projects: NextPage = () => {
  const { offerRules } = useNftfiContext()

  return (
    <div>
      <Head>
        <title>Configure Projects</title>
        <meta name='description' content='Current loans' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout>
        <div className='px-0 py-8 text-white md:px-16 max-w-7xl'>
          <div className='mt-8 text-2xl text-center md:mt-8 md:text-5xl'>
            Configure Projects
          </div>
          <div className='xl:grid xl:grid-cols-2 xl:gap-6'>
            {offerRules &&
              Object.keys(offerRules)
                .sort()
                .map(key => {
                  return (
                    <Link
                      className=''
                      href={`/edit-project?projectKey=${key}`}
                      key={key}
                    >
                      <div className='text-white cursor-pointer ' key={key}>
                        <ProjectRules
                          projectRule={offerRules[key]}
                          projectName={key}
                        />
                      </div>
                    </Link>
                  )
                })}
          </div>
        </div>
      </Layout>

      <footer></footer>
    </div>
  )
}

export default Projects
