import { describe, it, expect } from 'vitest';
import { getUuidFromUrl } from '@/utils/getUuidFromUrl';

describe('Test getFolderNameFromPath', () => {
  it('should return Uuid from selected url', () => {
    const UrlDataProvider = [
      {
        url: 'C:/Users/The_9/Documents/observation_db/Observation_Samples/6c019686-4b81-40e5-889f-62429124ac6a.jpg',
        expected: '6c019686-4b81-40e5-889f-62429124ac6a',
      },
      {
        url: 'D:/Data/Images/Observation_Samples/1b27e2c5-9d74-4a4e-a3a0-884b9e29dbf3.png',
        expected: '1b27e2c5-9d74-4a4e-a3a0-884b9e29dbf3',
      },
      {
        url: 'C:/Users/Admin/My Documents/Observation_Samples/f8c9d0a7-2b8b-4c88-97f9-cf0c5a8a2e11.jpeg',
        expected: 'f8c9d0a7-2b8b-4c88-97f9-cf0c5a8a2e11',
      },
      {
        url: '/home/user/observations/3a6cde5b-742b-44e7-ae9f-9f84224eac87.jpg',
        expected: '3a6cde5b-742b-44e7-ae9f-9f84224eac87',
      },
      {
        url: 'E:/Projects/AI/Models/Observations/Processed/da42c2b4-1af9-4f5b-9f4f-13e3c5b6c21d.jpg',
        expected: 'da42c2b4-1af9-4f5b-9f4f-13e3c5b6c21d',
      },
    ];
    UrlDataProvider.forEach((data) => {
      const uuid = getUuidFromUrl(data.url);
      expect(uuid).toBe(data.expected);
    });
  });
});
