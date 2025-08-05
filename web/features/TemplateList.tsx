import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import { getTemplates } from '../services/template';
import { useNav } from '../hooks/nav';
import { Search } from './components/Search';
import { Icon } from './components/Icon';
import { getRepos, removeRepo, updateRepo } from '../services/repo';
import { resolveName } from '../helpers/resolveName';
import { useToast } from '../contexts/ToastProvider';
import { BProgress } from '@bprogress/core';

interface Template {
  id: string;
  repo: string;
  slug: string;
  name?: string;
}

interface Repo {
  id: string;
  name: string;
  url?: string;
  maintainer?: string;
}

export default function TemplateList() {
  const { showToast } = useToast();
  const { popPage } = useNav();
  const [search, setSearch] = useState('');
  const [allTemplates, setAllTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [repos, setRepos] = useState<Repo[]>([]);

  const loadAll = useCallback(async (signal?: AbortSignal) => {
    try {
      const repos = await getRepos(signal);
      const templates = await getTemplates(signal);
      setRepos(repos);
      setAllTemplates(templates);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return;
      }
      throw err;
    }
  }, []);

  const handleUpdate = async (id: string) => {
    BProgress.start();
    try {
      await updateRepo(id);
      showToast('Repository updated', { variant: 'success' });
      await loadAll();
    } catch (err) {
      showToast(`Failed to update, ${err}`);
    } finally {
      BProgress.done();
    }
  };

  const handleRemove = async (id: string) => {
    BProgress.start();
    try {
      await removeRepo(id);
      showToast('Repository removed');
      await loadAll();
    } catch (err) {
      showToast(`Failed to remove, ${err}`);
    } finally {
      BProgress.done();
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const abort = () => {
      abortController.abort();
    };

    document.title = 'Templates | Kotakin';

    loadAll(abortController.signal);
    return abort;
  }, [loadAll]);

  useEffect(() => {
    const templates = allTemplates.filter((template) => {
      return template.slug.includes(search) || template.name?.includes(search);
    });
    setFilteredTemplates(templates);
  }, [search, allTemplates]);

  const repoTemplates = useCallback(
    (repoId: string) => filteredTemplates.filter((template) => template.repo === repoId),
    [filteredTemplates],
  );

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
          <div key={repo.id} className="mb-4 border rounded p-3">
            <div className="mb-3">
              <h4>{repo.name || resolveName(repo.id)}</h4>
              <div className="small text-muted">
                {repo.url} {repo.maintainer}
              </div>
            </div>

            <div className="d-flex gap-2 mb-3">
              <Button onClick={() => handleUpdate(repo.id)}>
                <i className="bi bi-arrow-repeat me-1" />
                Update
              </Button>

              <Button variant="danger" onClick={() => handleRemove(repo.id)}>
                <i className="bi bi-trash me-1" />
                Remove
              </Button>
            </div>

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
    return <div className="fst-italic border rounded p-3">no template</div>;
  }

  return templates.map((template) => (
    <div key={template.id} className="card flex-row align-items-center p-3">
      <Icon src={`/repo-assets/${template.id}/logo.png`} alt={template.name || template.slug} className="me-3" />
      <div>
        <div>{template.name || template.slug}</div>
        <Link to={`/box/-/add?template=${template.id}`} className="text-decoration-none">
          <Button variant="primary">
            <i className="bi bi-plus me-1" />
            Install
          </Button>
        </Link>
      </div>
    </div>
  ));
};
