import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getTemplates } from '../services/template';
import { Navbar } from './components/Navbar';

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
      <Navbar showBackIcon />
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
