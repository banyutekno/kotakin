import { useEffect, useState } from 'react';
import { Button, FormLabel } from 'react-bootstrap';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { getTemplate } from '../services/template';
import { configureBox, getBox } from '../services/box';
import { useNav } from '../hooks/nav';

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

export default function BoxConfigure() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const { popPage } = useNav();
  const { id } = useParams();
  const [template, setTemplate] = useState<Template>();

  useEffect(() => {
    const abortController = new AbortController();
    const abort = () => {
      abortController.abort();
    };

    document.title = 'Configure Box | Kotakin';

    const loadBoxAndTemplate = async () => {
      if (!id) return;

      try {
        const box = await getBox(id, abortController.signal);
        reset({
          name: box.name,
          env: { ...box.env },
        });

        if (box.template) {
          const template = await getTemplate(box.template, abortController.signal);
          setTemplate(template);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        throw err;
      }
    };

    loadBoxAndTemplate();

    return abort;
  }, [id, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    if (!id) {
      throw new Error('undefined id');
    }

    const name = values.name;
    const env = Object.fromEntries(Object.entries(values.env).filter(([_, value]) => value !== ''));

    await configureBox(id, { name, env });

    popPage('/');
  };

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="row w-100 g-0">
            <div className="col-6 col-md-3 text-start order-1 order-md-1">
              <div className="d-flex align-items-center">
                <Button onClick={() => popPage('/')} variant="link" className="text-body">
                  <i className="bi bi-arrow-left" />
                </Button>
                <span>Configure Box</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 text-muted small">
            <strong>Box ID:</strong> {id}
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
                  {...register(`env.${envConfig.name}`, { required: 'Application port is required' })}
                />
                {errors.env?.[envConfig.name] && (
                  <div className="invalid-feedback">{errors.env?.[envConfig.name]?.message}</div>
                )}
              </div>
            ))}
          </div>

          <div className="mb-3">
            <Button type="submit" variant="primary">
              <i className="bi bi-gear me-2" />
              Configure Box
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
