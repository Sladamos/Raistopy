import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useStopsStore } from '../src/@Stores/stopsStore';
import { StopService } from '../src/services/stopService';

vi.mock('@/services/stopService', () => ({
  StopService: {
    getStops: vi.fn(),
    getUserStops: vi.fn(),
    getStopDetails: vi.fn(),
    addUserStop: vi.fn(),
    deleteUserStop: vi.fn(),
  },
}));

describe('useStopsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.resetAllMocks();
  });

  it('initializes with correct state', () => {
    const stopsStore = useStopsStore();

    expect(stopsStore.stops).toEqual([]);
    expect(stopsStore.error).toBeNull();
    expect(stopsStore.isLoading).toBe(false);
    expect(stopsStore.stopDetails).toBeNull();
  });

  describe('actions', () => {
    it('fetches stops successfully', async () => {
      const mockStops = [{ id: '1', name: 'Stop 1' }];
      (StopService.getStops as Mock).mockResolvedValue({ data: { stops: mockStops } });

      const stopsStore = useStopsStore();
      await stopsStore.getStops();

      expect(StopService.getStops).toHaveBeenCalled();
      expect(stopsStore.stops).toEqual(mockStops);
      expect(stopsStore.isLoading).toBe(false);
      expect(stopsStore.error).toBeNull();
    });

    it('handles error while fetching stops', async () => {
      const mockError = 'Failed to fetch stops';
      (StopService.getStops as Mock).mockRejectedValue(new Error(mockError));

      const stopsStore = useStopsStore();
      await expect(stopsStore.getStops()).rejects.toThrow(mockError);

      expect(StopService.getStops).toHaveBeenCalled();
      expect(stopsStore.stops).toEqual([]);
      expect(stopsStore.isLoading).toBe(false);
    });

    it('fetches user stops successfully', async () => {
      const mockUserStops = [{ id: '2', name: 'User Stop' }];
      (StopService.getUserStops as Mock).mockResolvedValue({ data: { stops: mockUserStops } });

      const stopsStore = useStopsStore();
      await stopsStore.getUserStops('user123');

      expect(StopService.getUserStops).toHaveBeenCalledWith('user123');
      expect(stopsStore.stops).toEqual(mockUserStops);
      expect(stopsStore.isLoading).toBe(false);
      expect(stopsStore.error).toBeNull();
    });

    it('fetches stop details successfully', async () => {
      const mockStopDetails = { id: '1', name: 'Stop Details' };
      (StopService.getStopDetails as Mock).mockResolvedValue({ data: { stop: mockStopDetails } });

      const stopsStore = useStopsStore();
      await stopsStore.getStopDetails('stop123');

      expect(StopService.getStopDetails).toHaveBeenCalledWith('stop123');
      expect(stopsStore.stopDetails).toEqual(mockStopDetails);
      expect(stopsStore.isLoading).toBe(false);
      expect(stopsStore.error).toBeNull();
    });

    it('handles error while fetching stop details', async () => {
      const mockError = 'Failed to fetch stop details';
      (StopService.getStopDetails as Mock).mockRejectedValue(new Error(mockError));

      const stopsStore = useStopsStore();
      await stopsStore.getStopDetails('stop123');

      expect(StopService.getStopDetails).toHaveBeenCalledWith('stop123');
      expect(stopsStore.stopDetails).toBeNull();
      expect(stopsStore.error?.toString()).contains(mockError);
    });

    it('adds a user stop successfully', async () => {
      (StopService.addUserStop as Mock).mockResolvedValue(undefined);

      const stopsStore = useStopsStore();
      await stopsStore.addUserStop('user123', 'stop123');

      expect(StopService.addUserStop).toHaveBeenCalledWith('user123', 'stop123');
      expect(stopsStore.error).toBeNull();
    });

    it('handles error while adding a user stop', async () => {
      const mockError = 'Failed to add stop';
      (StopService.addUserStop as Mock).mockRejectedValue(new Error(mockError));

      const stopsStore = useStopsStore();
      await stopsStore.addUserStop('user123', 'stop123');

      expect(StopService.addUserStop).toHaveBeenCalledWith('user123', 'stop123');
      expect(stopsStore.error?.toString()).contains(mockError);
    });

    it('deletes a user stop successfully', async () => {
      const mockStops = [{ _id: 'stop123', name: 'Stop 1' }, { _id: 'stop456', name: 'Stop 2' }];
      (StopService.deleteUserStop as Mock).mockResolvedValue(undefined);

      const stopsStore = useStopsStore();
      stopsStore.stops = mockStops;

      await stopsStore.deleteUserStop('user123', 'stop123');

      expect(StopService.deleteUserStop).toHaveBeenCalledWith('user123', 'stop123');
      expect(stopsStore.stops).toEqual([{ _id: 'stop456', name: 'Stop 2' }]);
      expect(stopsStore.error).toBeNull();
    });

    it('handles error while deleting a user stop', async () => {
      const mockError = 'Failed to delete stop';
      (StopService.deleteUserStop as Mock).mockRejectedValue(new Error(mockError));

      const stopsStore = useStopsStore();
      await stopsStore.deleteUserStop('user123', 'stop123');

      expect(StopService.deleteUserStop).toHaveBeenCalledWith('user123', 'stop123');
      expect(stopsStore.error?.toString()).contains(mockError);
    });
  });
});
