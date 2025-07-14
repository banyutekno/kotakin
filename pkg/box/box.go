package box

type Kind string

const (
	KindContainer Kind = "container"
	KindCompose   Kind = "compose"
)

type Box struct {
	Name       string       `json:"name"`
	Kind       Kind         `json:"kind"`
	Containers []*Container `json:"containers"`
}
