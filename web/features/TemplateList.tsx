import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getTemplates } from '../services/template';
import { useNav } from '../hooks/nav';
import { Search } from './components/Search';
import { Icon } from './components/Icon';
import { getRepos } from '../services/repo';
import { resolveName } from '../helpers/resolveName';

interface Template {
  id: string;
  repo: string;
  slug: string;
  name?: string;
}

interface Repo {
  id: string;
  name: string;
  maintainer?: string;
}

export default function TemplateList() {
  const { popPage } = useNav();
  const [search, setSearch] = useState('');
  const [allTemplates, setAllTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    const abort = () => {
      abortController.abort();
    };

    document.title = 'Templates | Kotakin';

    const loadRepos = async () => {
      try {
        const repos = await getRepos(abortController.signal);
        setRepos(repos);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        throw err;
      }
    };

    const loadTemplates = async () => {
      try {
        const templates = await getTemplates(abortController.signal);
        setAllTemplates(templates);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        throw err;
      }
    };

    loadRepos();
    loadTemplates();

    return abort;
  }, []);

  useEffect(() => {
    const templates = allTemplates.filter((template) => {
      return template.id.includes(search) || template.name?.includes(search);
    });
    setFilteredTemplates(templates);
  }, [search, allTemplates]);

  const repoTemplates = (repoId: string) => filteredTemplates.filter((template) => template.repo === repoId);

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="row w-100 g-0">
            <div className="col-6 col-md-3 text-start order-1 order-md-1">
              <Button onClick={() => popPage('/')} variant="link" className="text-body">
                <i className="bi bi-arrow-left" />
              </Button>
            </div>

            <div className="col-6 col-md-3 text-end order-2 order-md-3">
              <Link to="/repo/-/add">
                <Button>
                  <i className="bi bi-plus me-1" />
                  Add Repository
                </Button>
              </Link>
            </div>

            <div className="col text-center order-3 order-md-2 mt-3 mt-md-0">
              <Search value={search} onChange={setSearch} />
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        {repos.map((repo) => (
          <div key={repo.id} className="mb-4">
            <h4>{repo.name || resolveName(repo.id)}</h4>
            <div className="d-flex flex-column gap-3">
              <TemplateCards templates={repoTemplates(repo.id)} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

interface TemplateCardsProps {
  templates: Template[];
}

const TemplateCards = ({ templates }: TemplateCardsProps) => {
  if (templates.length === 0) {
    return <div>empty</div>;
  }

  return templates.map((template) => (
    <div key={template.id} className="card flex-row align-items-center p-3">
      <Icon src={`/repo-assets/${template.id}/logo.png`} alt={template.name || template.slug} className="me-3" />
      <div>
        <div>{template.name || template.slug}</div>
        <Link to={`/box/-/add?template=${template.id}`} className="text-decoration-none">
          <Button variant="primary">Install</Button>
        </Link>
      </div>
    </div>
  ));
};
