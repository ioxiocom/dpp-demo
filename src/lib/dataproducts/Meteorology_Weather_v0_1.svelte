<script lang="ts">
  type WeatherDataResponse = {
    temperature: number
    humidity: number
    pressure: number
    windSpeed: number
    windDirection: number
    precipitation: number
    visibility: number
  }

  let { request, response } = $props()
  let { lat, lon } = $derived(request)
  let { temperature, humidity }: WeatherDataResponse = $derived(response)
</script>

<p>Weather at {lat}, {lon} is {temperature}&deg;C @ {humidity}%</p>
