import { Link } from 'react-router-dom';
import { Search } from './components/Search';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getTemplates } from '../services/template';

interface Template {
  id: string;
}

export default function TemplateList() {
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
      <nav className="p-2 column-bg">
        <div className="d-flex align-items-center justify-content-between w-100">
          <Link to="/" className="text-decoration-none text-reset">
            <div className="ms-3">
              <i className="bi bi-arrow-left-short fs-1" />
            </div>
          </Link>

          <div className="flex-grow-1 d-flex justify-content-center">
            <div className="w-50">
              <Search />
            </div>
          </div>

          <div className="me-3">
            <Button>Add Repository</Button>
          </div>
        </div>
      </nav>

      <div>
        {templates.map((template) => (
          <div key={template.id} className="border p-2 m-2">
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
