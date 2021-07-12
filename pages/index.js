import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar(props) {
  return (
    <Box>
      <img
        style={{ borderRadius: 8 }}
        src={`https://github.com/${props.githubUser}.png`}
        alt="Avatar" />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'zNexTage';
  const favoritePeople = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  return (
    <>

      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar
            githubUser={githubUser}
          />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">
              Bem vindo
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: "profileRelationsArea" }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidades ({favoritePeople.length})
            </h2>
            <ul>
              {favoritePeople.map((person) => (
                <li key={person}>
                  <a href={`users/${person}`}>
                    <img src={`https://github.com/${person}.png`} />
                    <span>
                      {person}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>
            Comunidade
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
