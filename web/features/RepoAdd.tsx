import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button, FormLabel } from 'react-bootstrap';
import { addRepo } from '../services/repo';
import { useNav } from '../hooks/nav';
import { useEffect } from 'react';

interface FormValues {
  url: string;
}

export default function RepoAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { popPage } = useNav();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    await addRepo(values.url);
    popPage('/store');
  };

  useEffect(() => {
    document.title = 'Add Repository | Kotakin';
  }, []);

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
                <span>Add Repository</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <FormLabel>Repository URL</FormLabel>
            <input
              type="text"
              className={`form-control ${errors.url ? 'is-invalid' : ''}`}
              placeholder="https://github.com/your-repo"
              {...register('url', { required: 'URL is required' })}
            />
            {errors.url && <div className="invalid-feedback">{errors.url.message}</div>}
          </div>

          <div className="mb-3">
            <Button type="submit" variant="primary">
              <i className="bi bi-plus" />
              Add Repository
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
