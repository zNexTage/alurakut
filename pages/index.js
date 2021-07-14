import React from 'react';
import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img
        style={{ borderRadius: 8 }}
        src={`https://pbs.twimg.com/profile_images/1284164326639775745/TPrxZUca_400x400.jpg`}
        alt="Avatar" />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox({ title, items }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({items.length})
      </h2>
      <ul>
        {items.map((item, index) => {
          if (index <= 5) {
            return (
              <ProfileRelationItem
                {...item}
              />
            )
          }
          else {
            return (<></>)
          }
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

function ProfileRelationItem({ id, title, image }) {
  return (
    <li>
      <a href={`users/${title}`}>
        <img src={image} />
        <span>
          {title}
        </span>
      </a>
    </li>
  )
}

export default function Home() {
  const [followers, setFollowers] = React.useState([]);
  const [communities, setCommunities] = React.useState([{
    id: new Date().toISOString(),
    title: "Eu odeio acordar cedo",
    image: "https://alurakut.vercel.app/capa-comunidade-01.jpg"
  }, {
    id: 2,
    title: "Colheita Feliz",
    image: "https://alurakut.vercel.app/capa-comunidade-01.jpg"
  }, {
    id: 3,
    title: "Cafemania",
    image: "https://alurakut.vercel.app/capa-comunidade-01.jpg"
  }]);

  const githubUser = 'zNexTage';
  const favoritePeople = [
    {
      id: 1,
      title: "juunegreiros",
      image: "https://github.com/juunegreiros.png"
    },
    {
      id: 2,
      title: "omariosouto",
      image: "https://github.com/omariosouto.png"
    },
    {
      id: 3,
      title: "peas",
      image: "https://github.com/peas.png"
    }, {
      id: 4,
      title: "rafaballerini",
      image: "https://github.com/rafaballerini.png"
    }, {
      id: 5,
      title: "marcobrunodev",
      image: "https://github.com/marcobrunodev.png"
    }, {
      id: 5,
      title: "felipefialho",
      image: "https://github.com/felipefialho.png"
    }
  ];


  React.useEffect(() => {
    fetch('https://api.github.com/users/peas/followers')
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        const formatFollowes = response.map((follower) => {
          return {
            id: follower.id,
            title: follower.login,
            image: follower.avatar_url
          }
        });

        setFollowers(formatFollowes);
      });
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const community = {
      id: new Date().toISOString(),
      title: formData.get('title'),
      image: formData.get('image')
    };

    const updatedCommunities = [...communities, community];

    setCommunities(updatedCommunities);
  }

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

          <Box>
            <h2 className="subTitle">
              O que você deseja fazer?
            </h2>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                  placeholder="Qual vai ser o nome da sua comunidade?" />
              </div>

              <div>
                <input
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  type="text"
                  placeholder="Coloque uma URL para usarmos de capa" />
              </div>
              <button>
                Criar Comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: "profileRelationsArea" }}>

          <ProfileRelationsBox
            title="Comunidades"
            items={communities}
          />

          <ProfileRelationsBox
            title="Pessoas da Comunidades"
            items={favoritePeople}
          />

          <ProfileRelationsBox
            title="Seguidores"
            items={followers}
          />
        </div>
      </MainGrid>
    </>
  )
}
