import { describe, expect, it } from 'vitest';
import { useObservationForm } from '@/composables/useObservationForm';

describe('useObservationForm', () => {
  it('requires every field except comments to be filled', () => {
    const { form, areRequiredFieldsFilled } = useObservationForm('observation-id');

    expect(areRequiredFieldsFilled()).toBe(false);

    form.scientificName = 'Species name';
    form.family = 'Family';
    form.order = 'Order';
    form.observedAt = '2026-10-04';
    form.observationPlace = 'Observation site';
    form.province = 'Province';
    form.locality = 'Locality';
    form.coordinates = '1, 2';

    expect(areRequiredFieldsFilled()).toBe(true);

    form.comments = 'Optional comment';
    expect(areRequiredFieldsFilled()).toBe(true);
  });

  it('treats whitespace-only required fields as empty', () => {
    const { form, areRequiredFieldsFilled } = useObservationForm('observation-id');

    form.scientificName = ' ';

    expect(areRequiredFieldsFilled()).toBe(false);
  });
});
