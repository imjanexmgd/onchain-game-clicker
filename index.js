import axios from 'axios';
import fs from 'fs';
import { setTimeout } from 'timers/promises';
const getAccInfo = async (token) => {
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    try {
      const { data } = await axios.get('https://db4.onchaincoin.io/api/info', {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Linux; Android 11; Redmi Note 8 Build/RQ3A.211001.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.6099.144 Mobile Safari/537.36',
          Accept: 'application/json, text/plain, */*',
          'sec-ch-ua':
            '"Not_A Brand";v="8", "Chromium";v="120", "Android WebView";v="120"',
          'sec-ch-ua-mobile': '?1',
          authorization: `Bearer ${token}`,
          'sec-ch-ua-platform': '"Android"',
          'x-requested-with': 'org.telegram.messenger',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-mode': 'cors',
          'sec-fetch-dest': 'empty',
          referer: 'https://db4.onchaincoin.io/',
          'accept-language': 'en,en-US;q=0.9',
          'if-none-match': 'W/"19a-Nxz/2KeXKz9hf6gVOHucjVGao4c"',
        },
      });

      return data.user;
    } catch (error) {
      attempts += 1;
      if (attempts >= maxAttempts) {
        throw error;
      }
      console.log(`Attempt ${attempts} failed get account info, retrying...`);
    }
  }
};
const clickChain = async (token, clickamount) => {
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    try {
      const { data } = await axios.post(
        'https://db4.onchaincoin.io/api/klick/myself/click',
        {
          clicks: clickamount,
        },
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Linux; Android 11; Redmi Note 8 Build/RQ3A.211001.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.6099.144 Mobile Safari/537.36',
            'sec-ch-ua':
              '"Not_A Brand";v="8", "Chromium";v="120", "Android WebView";v="120"',
            'sec-ch-ua-mobile': '?1',
            authorization: `Bearer ${token}`,
            'sec-ch-ua-platform': '"Android"',
            origin: 'https://db4.onchaincoin.io',
            'x-requested-with': 'org.telegram.messenger',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            referer: 'https://db4.onchaincoin.io/',
            'accept-language': 'en,en-US;q=0.9',
          },
        }
      );

      return data;
    } catch (error) {
      attempts += 1;
      if (attempts >= maxAttempts) {
        throw error;
      }
      console.log(`Attempt ${attempts} failed click, retrying...`);
    }
  }
};
const getToken = async (hash) => {
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    try {
      const { data } = await axios.post(
        'https://db4.onchaincoin.io/api/validate',
        {
          hash: hash,
        },
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Linux; Android 14; Z832 Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.6312.40 Mobile Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            Referer: 'https://db4.onchaincoin.io/',
            Origin: 'https://db4.onchaincoin.io',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'no-cors',
            'Sec-Fetch-Site': 'cross-site',
            'Alt-Used': 'db4.onchaincoin.io',
            Connection: 'keep-alive',
            TE: 'trailers',
            Pragma: 'no-cache',
            'Cache-Control': 'no-cache',
          },
        }
      );
      console.log('success get token');
      return data.token;
    } catch (error) {
      attempts += 1;
      if (attempts >= maxAttempts) {
        throw error;
      }
      console.log(`Attempt ${attempts} failed click, retrying...`);
    }
  }
};
const censoredName = (name) => {
  const nameLength = name.length;
  const minCharactersToCensor = 3;
  const numCharactersToCensor = Math.max(
    minCharactersToCensor,
    Math.floor(Math.random() * (nameLength - 1))
  );
  const censoredIndexes = new Set();
  while (censoredIndexes.size < numCharactersToCensor) {
    const index = Math.floor(Math.random() * nameLength);
    censoredIndexes.add(index);
  }
  let censorChar = '*';
  let censoredName = '';
  for (let i = 0; i < nameLength; i++) {
    if (censoredIndexes.has(i)) {
      censoredName += censorChar;

      censorChar = censorChar === '*' ? '~' : '*';
    } else {
      censoredName += name[i];
    }
  }

  return censoredName;
};
const claimDailyEnergy = async (token, name) => {
  try {
    const { data } = await axios.post(
      'https://db4.onchaincoin.io/api/boosts/energy',
      {},
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Linux; Android 11; Redmi Note 8 Build/RQ3A.211001.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.6099.144 Mobile Safari/537.36',
          'sec-ch-ua':
            '"Not_A Brand";v="8", "Chromium";v="120", "Android WebView";v="120"',
          'sec-ch-ua-mobile': '?1',
          authorization: `Bearer ${token}`,
          'sec-ch-ua-platform': '"Android"',
          origin: 'https://db4.onchaincoin.io',
          'x-requested-with': 'org.telegram.mdgram',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-mode': 'cors',
          'sec-fetch-dest': 'empty',
          referer: 'https://db4.onchaincoin.io/boost',
          'accept-language': 'en,en-US;q=0.9',
        },
      }
    );
    console.log(`${name} success claim daily energy refill`);
  } catch (error) {
    throw error;
  }
};
(async () => {
  try {
    process.stdout.write('\x1Bc');
    const hashFile = fs.readFileSync('req.txt', 'utf-8').replace(/\r/g, '');
    const hashArr = hashFile.split('\n');

    for (const hash of hashArr) {
      const token = await getToken(hash);
      let r = await getAccInfo(token.toString());
      const name = censoredName(r.fullName);
      const energyPerClick = parseInt(r.clickLevel);
      console.log(
        `logged as ${name} energy ${r.energy} || ${energyPerClick} energy/click || statusBanned ${r.isBanned}`
      );
      let dailyEnergyRefill = 1;
      while (dailyEnergyRefill == 1) {
        let energy = r.energy;

        while (energy >= energyPerClick) {
          if (energy < energyPerClick) {
            // claim energy refill r.dailyEnergyRefill

            console.log(`stopped because no energy`);
            break;
          }
          const maxClicks = Math.min(2000, Math.floor(energy / energyPerClick));
          const clickAmount = Math.floor(Math.random() * maxClicks) + 1;
          // const clickAmount = maxClicks;
          if (clickAmount * energyPerClick > energy) {
            console.log('Insufficient energy');
            break;
          }

          const doClick = await clickChain(token, clickAmount);
          console.log(
            `success ${clickAmount} click  energy ${doClick.energy}  coins ${doClick.coins}  points ${doClick.clicks} `
          );
          energy = doClick.energy;
          const delay = 1500;
          console.log(`Delaying ${delay} ms`);
          await setTimeout(delay);
        }
        if (r.dailyEnergyRefill == 1) {
          console.log(`${name} Claiming daily energy refill`);
          await claimDailyEnergy(token.toString(), name);
          r = await getAccInfo(token.toString());
          energy = r.energy;
          continue;
        } else {
          dailyEnergyRefill = 0;
          console.log(
            `${name} process done because no energy and no daily energy refill`
          );
          console.log();
          continue;
        }
      }
    }

    return;
  } catch (error) {
    console.log('error');
    console.log(error);
  }
})();
