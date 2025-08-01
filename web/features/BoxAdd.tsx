import { useEffect, useState } from 'react';
import { Button, FormLabel } from 'react-bootstrap';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getTemplate } from '../services/template';
import { addBox } from '../services/box';

interface FormValues {
  name: string;
  env: Record<string, string>;
}

interface EnvConfig {
  name: string;
  label: string;
  description: string;
  default: string;
}

interface Template {
  id: string;
  env_configs: EnvConfig[];
}

export default function BoxAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template');
  const [template, setTemplate] = useState<Template>();

  useEffect(() => {
    document.title = 'Add Box | Kotakin';

    const loadTemplate = async () => {
      if (!templateId) return;
      const template = await getTemplate(templateId);
      setTemplate(template);
    };

    loadTemplate();
  }, [templateId]);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    if (!template) {
      throw new Error('template not ready');
    }

    const env = Object.fromEntries(Object.entries(values.env).filter(([_, value]) => value !== ''));

    await addBox({
      template: template.id,
      name: values.name,
      env,
    });

    navigate('/');
  };

  return (
    <div className="container py-5">
      <div className="column-bg card rounded-4 px-4 py-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h2 className="mb-4 ">
              <i className="bi bi-box" /> Add New Box
            </h2>
            <Link to="/store" className="text-decoration-none text-reset">
              <Button variant="secondary">
                <i className="bi bi-arrow-left-short fs-5" />
                Back
              </Button>
            </Link>
          </div>

          <div className="mb-3 text-muted small">
            <strong>Template ID:</strong> {template?.id ?? '(unavailable)'}
          </div>
          <div className="mb-3">
            <FormLabel>Name</FormLabel>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Enter box name"
              {...register('name')}
            />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </div>
          <div>
            {(template?.env_configs ?? []).map((envConfig) => (
              <div key={envConfig.name} className="mb-3">
                <FormLabel>
                  {envConfig.label} <small className="text-muted">({envConfig.name})</small>
                </FormLabel>
                <input
                  type="text"
                  className={`form-control ${errors.env?.[envConfig.name] ? 'is-invalid' : ''}`}
                  placeholder={`Enter ${envConfig.label.toLowerCase()}`}
                  {...register(`env.${envConfig.name}`)}
                />
                {errors.env?.[envConfig.name] && (
                  <div className="invalid-feedback">{errors.env?.[envConfig.name]?.message}</div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button type="submit" variant="primary" className="w-100">
              <i className="bi bi-plus me-2" />
              Add Box
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
