import { Link } from 'react-router-dom';
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
      <nav className="nav-bg p-2">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-6 col-md-3 d-flex justify-content-start mb-3 mb-md-0">
              <Link to="/" className="text-decoration-none text-reset">
                <div className="rounded-circle back-btn d-flex align-items-center justify-content-center">
                  <i className="bi bi-arrow-left-short fs-1" />
                </div>
              </Link>
            </div>

            <div className="col-6 col-md-9 d-flex justify-content-end">
              <Link to="/repo/-/add">
                <Button>Add Repository</Button>
              </Link>
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
