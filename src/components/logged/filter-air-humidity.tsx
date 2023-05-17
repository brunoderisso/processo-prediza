import {
    Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';

interface FilterAirHumidityProps {
  requestAirHumidity: () => void
  date: Date | null
  getDate: (valor: Date | null) => void
  period: number
  getPeriod: (valor: number) => void
  interval: string
  getInterval: (valor: string) => void
}

export default function FilterAirHumidity(props: FilterAirHumidityProps) {
  const periodOptions = [3, 6, 12, 24]
  const intervalOptions = {
    '5m': '5 minutos',
    '15m': '15 minutos',
    '30m': '30 minutos',
    '1h': '1 hora',
  }

  return (
    <Stack spacing={2} sx={{width: '20%', margin: '30px 10px'}}>
      <DateTimePicker
        label="Data Início"
        value={ props.date }
        onChange={ newDate => props.getDate(newDate) }
      />
      <FormControl fullWidth>
        <InputLabel id="period-label">Período</InputLabel>
        <Select
          labelId="period-label"
          id="period-select"
          value={ props.period.toString() }
          label="Período"
          onChange={ (e: SelectChangeEvent) => props.getPeriod(+e.target.value) }
        >
          {periodOptions.map(option => (
            <MenuItem value={ option } key={option}>{option} horas</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="period-label">Período</InputLabel>
        <Select
          labelId="period-label"
          id="period-select"
          value={ props.interval }
          label="Período"
          onChange={ (e: SelectChangeEvent) => props.getInterval(e.target.value) }
        >
          {Object.entries(intervalOptions).map(([key, value]) => (
            <MenuItem value={ key } key={ key }>{ value }</MenuItem>
          ))}

        </Select>
      </FormControl>
      <Button variant='contained' size='small' onClick={() => props.requestAirHumidity()}>Acessar</Button>
    </Stack>
  )
}