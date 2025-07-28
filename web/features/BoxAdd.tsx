import { useEffect, useState } from 'react';
import { Button, FormLabel } from 'react-bootstrap';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Add Box</h1>

        <div className="mb-3">{template?.id}</div>

        <div className="mb-3">
          <FormLabel>Name</FormLabel>
          <input type="text" className="form-control" {...register('name')} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          {(template?.env_configs ?? []).map((envConfig) => (
            <div key={envConfig.name} className="mb-3">
              <FormLabel>
                {envConfig.label} {envConfig.name}
              </FormLabel>
              <input type="text" className="form-control" {...register(`env.${envConfig.name}`)} />
              {errors.env?.[envConfig.name] && <p>{errors.env?.[envConfig.name]?.message}</p>}
            </div>
          ))}
        </div>

        <div className="mb-3">
          <Button type="submit">Add</Button>
        </div>
      </form>
    </div>
  );
}
