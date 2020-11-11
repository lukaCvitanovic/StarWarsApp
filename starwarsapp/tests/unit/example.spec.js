import { shallowMount } from '@vue/test-utils'
import SearchOptions from '@/components/search/SearchOptions'
import SearchInput from '@/components/search/SearchInput'
import BaseButton from '@/components/common/BaseButton'
import SearchResults from '@/components/search/SearchResults'
import SearchResult from '@/components/search/SearchResult'
import searchOptions from '@/config/searchOptions'
const { PEOPLE, MOVIES } = searchOptions

const factory = (component, props = {}, values = {}) => {
  return shallowMount(component, {
    propsData: { ...props },
    data () {
      return { ...values }
    }
  })
}

describe('SearchInput', () => {
  it('has movie based placeholder', () => {
    const wrapper = factory(SearchInput, { searchType: MOVIES })
    expect(wrapper.find('.search-input').attributes('placeholder')).toBe('e.g. Star Wars: The New Hope')
  })

  it('has character based placeholder', () => {
    const wrapper = factory(SearchInput, { searchType: PEOPLE })
    expect(wrapper.find('.search-input').attributes('placeholder')).toBe('e.g. Ahsoka Tano, Luke Skywalker, Bendu')
  })
})

describe('SearchOptions search button', () => {
  it('is disabled when input has no value', () => {
    const wrapper = factory(SearchOptions, { buttonText: 'Search' }, { value: '' })
    expect(wrapper.findComponent(BaseButton).attributes('disabled')).toBeTruthy()
  })

  it('is enabled when input has some value', () => {
    const wrapper = factory(SearchOptions, { buttonText: 'Search' }, { value: 'some value' })
    expect(wrapper.findComponent(BaseButton).attributes('disabled')).toBeFalsy()
  })

  it('is disabled if there is an error message even if input has some value', () => {
    const wrapper = factory(SearchOptions, { buttonText: 'Search', error: 'error message' }, { value: 'some value' })
    expect(wrapper.findComponent(BaseButton).attributes('disabled')).toBeTruthy()
  })
})

describe('SearchResult', () => {
  it('show a SearchResult with coresponding name', () => {
    const name = 'Luke Skywalker'
    const link = '/details/people/1'
    const wrapper = factory(SearchResult, { name, link })
    expect(wrapper.find('.search-result-name').text()).toBe(name)
  })
})

describe('SearchResults', () => {
  it('show "no results" message when there are no results', () => {
    const wrapper = factory(SearchResults, { results: [] })
    expect(wrapper.find('.no-results').exists()).toBeTruthy()
  })

  it('renders results as SearchResult when there are results', () => {
    const results = [{ name: 'Luke Skywalker', url: '/details/people/1' }]
    const wrapper = factory(SearchResults, { results: results })
    expect(wrapper.find('.no-results').exists()).toBeFalsy()
    expect(wrapper.findComponent(SearchResult).exists()).toBeTruthy()
  })

  it('show an error message even if there are results', () => {
    const results = [{ name: 'Luke Skywalker', url: '/details/people/1' }]
    const wrapper = factory(SearchResults, { results: results, errorMsg: 'error' })
    expect(wrapper.find('.no-results').exists()).toBeFalsy()
    expect(wrapper.find('.error')).toBeTruthy()
  })
})