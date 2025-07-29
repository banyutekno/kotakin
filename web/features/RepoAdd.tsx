import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button, FormLabel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { addRepo } from '../services/repo';

interface FormValues {
  url: string;
}

export default function RepoAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    await addRepo(values.url);
    navigate('/store');
  };

  return (
    <div className="container py-5">
      <div className="column-bg card shadow rounded-4 px-4 py-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h2 className="mb-4 ">
              <i className="bi bi-folder me-2" />
              Add Repository
            </h2>
            <Link to="/store" className="text-decoration-none text-reset">
              <Button variant="secondary">
                <i className="bi bi-arrow-left-short fs-5" />
                Back
              </Button>
            </Link>
          </div>
          <div className="mb-3">
            <FormLabel>URL</FormLabel>
            <input
              type="text"
              className={`form-control ${errors.url ? 'is-invalid' : ''}`}
              placeholder="Enter repository URL"
              {...register('url', { required: 'URL is required' })}
            />
            {errors.url && <div className="invalid-feedback">{errors.url.message}</div>}
          </div>

          <div className="mt-4">
            <Button type="submit" variant="primary" className="w-100">
              <i className="bi bi-plus me-2" />
              Add Repo
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
