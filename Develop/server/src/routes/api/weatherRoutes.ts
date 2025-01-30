import { Router } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';

import WeatherService from '../../service/weatherService.js';

// import WeatherService from '../../service/weatherService.js';

// xTODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  try {
    // xTODO: save city to search history
    const cityName = req.body.cityName;
    WeatherService.getWeatherForCity(cityName).then((data) => {
      HistoryService.addCity(cityName);

      res.json(data);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
// x TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  HistoryService.getCities()
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete('/history/:id', async (req, res) => { });

export default router;
