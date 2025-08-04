import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getTemplates } from '../services/template';
import { useNav } from '../hooks/nav';
import { Search } from './components/Search';

interface Template {
  id: string;
}

export default function TemplateList() {
  const { popPage } = useNav();
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    document.title = 'Templates | Kotakin';

    (async () => {
      const templates = await getTemplates();
      setTemplates(templates);
    })();
  }, []);

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
              <Search />
            </div>
          </div>
        </div>
      </nav>

      <div>
        {templates.map((template) => (
          <div key={template.id} className="border p-2 m-2">
            <img src={`/repo-assets/${template.id}/logo.png`} alt="" />
            {template.id}
            <Link to={`/box/-/add?template=${template.id}`} className="text-decoration-none text-reset">
              <Button>Install</Button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
