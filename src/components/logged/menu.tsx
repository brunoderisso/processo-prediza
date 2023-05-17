import { Button, ButtonGroup } from '@mui/material';

interface MenuProps {
  getBtnClicked: (name: string) => void
}

export default function Menu(props: MenuProps) {
  return (
    <ButtonGroup variant='contained' aria-label='outlined primary button group'>
      <Button onClick={() => props.getBtnClicked('air-humidity')}>Umidade do Ar</Button>
      <Button onClick={() => props.getBtnClicked('map')}>Mapa</Button>
    </ButtonGroup>
  )
}