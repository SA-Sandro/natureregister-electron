import { beforeEach, describe, expect, it, vi } from 'vitest';
import { promises as fs } from 'fs';
import { FileSystemImageRepository } from '../../../../server/infrastructure/repositories/FileSystemImageRepository';

describe('Test FileSystemImage repository', () => {
  const repo = new FileSystemImageRepository();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('Should return all valid images', async () => {
    vi.spyOn(fs, 'readdir').mockResolvedValue([
      'Image1.jpg',
      'doc.pdf',
      'Image2.webp',
    ] as unknown as Awaited<ReturnType<typeof fs.readdir>>);
    vi.spyOn(fs, 'stat').mockResolvedValue({
      isDirectory: () => false,
      size: 1000,
      birthtime: new Date(),
    } as unknown as Awaited<ReturnType<typeof fs.stat>>);

    const images = await repo.getImagesFromFolder('testFolder');
    expect(images).toHaveLength(2);
    expect(images[0].getUrl()).equal('testFolder\\Image1.jpg');
    expect(images[1].getUrl()).equal('testFolder\\Image2.webp');
  });

  it('should return empty array if folder is empty', async () => {
    vi.spyOn(fs, 'readdir').mockResolvedValue(
      [] as unknown as Awaited<ReturnType<typeof fs.readdir>>,
    );
    const images = await repo.getImagesFromFolder('emptyFolder');
    expect(images).toHaveLength(0);
  });

  it('should show console error if folder does not exists and return empty array', async () => {
    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(fs, 'readdir').mockRejectedValue(new Error('Folder not found'));
    const images = await repo.getImagesFromFolder('nonExistentFolder');

    expect(images).toHaveLength(0);
    expect(consoleErrorMock).toHaveBeenCalledWith('Error reading folder:', expect.any(Error));
  });

  it('should show console warning with ignored files', async () => {
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});

    vi.spyOn(fs, 'readdir').mockResolvedValue([
      'Image1.jpg',
      'doc.pdf',
      'Image2.webp',
    ] as unknown as Awaited<ReturnType<typeof fs.readdir>>);
    vi.spyOn(fs, 'stat').mockResolvedValue({
      isDirectory: () => false,
      size: 1000,
      birthtime: new Date(),
    } as unknown as Awaited<ReturnType<typeof fs.stat>>);

    await repo.getImagesFromFolder('testFolder');
    expect(consoleWarnMock).toHaveBeenCalledWith(
      'Ignored file: testFolder\\doc.pdf',
      'Invalid image extension: .pdf',
    );
  });
});
